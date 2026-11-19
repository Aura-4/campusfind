// ─────────────────────────────────────────────────────────────
// useCamera — custom camera hook using MediaDevices.getUserMedia
//
// Workflow:
//   1. Call startCamera() to request permission and open the feed.
//   2. Call captureImage() to grab a frame → returns a Blob.
//   3. Call retake() to discard the preview and re-activate the feed.
//   4. Call stopCamera() to release all tracks (always call on unmount).
//
// This hook is intentionally UI-agnostic — rendering is handled
// by CameraModal (Phase 3). It is NOT wired to the OS file picker.
// ─────────────────────────────────────────────────────────────

import { useCallback, useRef, useState } from 'react'
import { CAMERA_CONSTRAINTS } from '@/utils/constants'

export type CameraError =
  | 'PERMISSION_DENIED'
  | 'NOT_AVAILABLE'
  | 'UNKNOWN'
  | null

interface UseCameraReturn {
  // Refs — attach to <video> and <canvas> elements
  videoRef: React.RefObject<HTMLVideoElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>

  // State
  isActive: boolean          // camera feed is live
  capturedBlob: Blob | null  // non-null after captureImage()
  capturedUrl: string | null // object URL for preview
  cameraError: CameraError
  isRequesting: boolean      // while awaiting getUserMedia permission

  // Actions
  startCamera: () => Promise<void>
  captureImage: () => Blob | null
  retake: () => void
  stopCamera: () => void
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [isActive, setIsActive] = useState(false)
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null)
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<CameraError>(null)
  const [isRequesting, setIsRequesting] = useState(false)

  // ─── Start camera ──────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setCameraError(null)
    setIsRequesting(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        CAMERA_CONSTRAINTS
      )
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setIsActive(true)
    } catch (err: unknown) {
      if (err instanceof DOMException) {
        if (
          err.name === 'NotAllowedError' ||
          err.name === 'PermissionDeniedError'
        ) {
          setCameraError('PERMISSION_DENIED')
        } else if (
          err.name === 'NotFoundError' ||
          err.name === 'DevicesNotFoundError'
        ) {
          setCameraError('NOT_AVAILABLE')
        } else {
          setCameraError('UNKNOWN')
        }
      } else {
        setCameraError('UNKNOWN')
      }
      setIsActive(false)
    } finally {
      setIsRequesting(false)
    }
  }, [])

  // ─── Capture image ─────────────────────────────────────────
  const captureImage = useCallback((): Blob | null => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !isActive) return null

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Stop the stream immediately after capture
    streamRef.current?.getTracks().forEach((t) => t.stop())
    setIsActive(false)

    // Convert to Blob — stored as JPEG for smaller size
    let blob: Blob | null = null
    canvas.toBlob(
      (b) => {
        if (!b) return
        blob = b
        const url = URL.createObjectURL(b)
        setCapturedBlob(b)
        setCapturedUrl(url)
      },
      'image/jpeg',
      0.92
    )

    return blob
  }, [isActive])

  // ─── Retake ────────────────────────────────────────────────
  const retake = useCallback(() => {
    // Release previous preview URL to avoid memory leaks
    if (capturedUrl) {
      URL.revokeObjectURL(capturedUrl)
    }
    setCapturedBlob(null)
    setCapturedUrl(null)
    startCamera()
  }, [capturedUrl, startCamera])

  // ─── Stop camera ───────────────────────────────────────────
  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (capturedUrl) {
      URL.revokeObjectURL(capturedUrl)
    }
    setCapturedBlob(null)
    setCapturedUrl(null)
    setIsActive(false)
    setCameraError(null)
  }, [capturedUrl])

  return {
    videoRef,
    canvasRef,
    isActive,
    capturedBlob,
    capturedUrl,
    cameraError,
    isRequesting,
    startCamera,
    captureImage,
    retake,
    stopCamera,
  }
}
