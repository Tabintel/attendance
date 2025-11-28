'use client';

import { useState, useEffect, useCallback } from 'react';

// FACEIO error codes
export const fioErrCode = {
  PERMISSION_REFUSED: 'PERMISSION_REFUSED',
  NO_FACES_DETECTED: 'NO_FACES_DETECTED',
  UNRECOGNIZED_FACE: 'UNRECOGNIZED_FACE',
  MANY_FACES: 'MANY_FACES',
  FACE_DUPLICATION: 'FACE_DUPLICATION',
  MINORS_NOT_ALLOWED: 'MINORS_NOT_ALLOWED',
  PAD_ATTACK: 'PAD_ATTACK',
  FACE_MISMATCH: 'FACE_MISMATCH',
  WRONG_PIN_CODE: 'WRONG_PIN_CODE',
  PROCESSING_ERR: 'PROCESSING_ERR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  TERMS_NOT_ACCEPTED: 'TERMS_NOT_ACCEPTED',
  UI_NOT_READY: 'UI_NOT_READY',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  TIMEOUT: 'TIMEOUT',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  EMPTY_ORIGIN: 'EMPTY_ORIGIN',
  FORBIDDDEN_ORIGIN: 'FORBIDDDEN_ORIGIN',
  FORBIDDDEN_COUNTRY: 'FORBIDDDEN_COUNTRY',
  SESSION_IN_PROGRESS: 'SESSION_IN_PROGRESS',
  NETWORK_IO: 'NETWORK_IO'
};

interface FaceIOInstance {
  enroll: (options: any) => Promise<any>;
  authenticate: (options: any) => Promise<any>;
  restartSession: () => boolean;
}

declare global {
  interface Window {
    faceIO: any;
  }
}

export function useFaceIO(publicId: string) {
  const [faceio, setFaceio] = useState<FaceIOInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load FACEIO script
    const script = document.createElement('script');
    script.src = 'https://cdn.faceio.net/fio.js';
    script.async = true;
    
    script.onload = () => {
      try {
        if (window.faceIO) {
          const instance = new window.faceIO(publicId);
          setFaceio(instance);
          setIsReady(true);
        }
      } catch (err) {
        setError('Failed to initialize FACEIO');
        console.error('FACEIO initialization error:', err);
      }
    };

    script.onerror = () => {
      setError('Failed to load FACEIO script');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [publicId]);

  const enrollEmployee = useCallback(async (employeeId: string, employeeName: string) => {
    if (!faceio) {
      throw new Error('FACEIO not initialized');
    }

    try {
      const userInfo = await faceio.enroll({
        locale: 'auto',
        userConsent: false,
        payload: {
          employeeId,
          employeeName
        }
      });

      return {
        facialId: userInfo.facialId,
        timestamp: userInfo.timestamp,
        details: userInfo.details
      };
    } catch (errCode) {
      handleError(errCode as string);
      throw errCode;
    }
  }, [faceio]);

  const authenticateEmployee = useCallback(async () => {
    if (!faceio) {
      throw new Error('FACEIO not initialized');
    }

    try {
      const userData = await faceio.authenticate({
        locale: 'auto'
      });

      return {
        facialId: userData.facialId,
        payload: userData.payload
      };
    } catch (errCode) {
      handleError(errCode as string);
      throw errCode;
    }
  }, [faceio]);

  const handleError = (errCode: string) => {
    const errorMessages: Record<string, string> = {
      [fioErrCode.PERMISSION_REFUSED]: 'Camera access was denied',
      [fioErrCode.NO_FACES_DETECTED]: 'No face detected. Please position yourself in front of the camera',
      [fioErrCode.UNRECOGNIZED_FACE]: 'Face not recognized. Please enroll first',
      [fioErrCode.MANY_FACES]: 'Multiple faces detected. Please ensure only one person is in frame',
      [fioErrCode.FACE_DUPLICATION]: 'This face is already enrolled',
      [fioErrCode.PAD_ATTACK]: 'Presentation attack detected. Please use your real face',
      [fioErrCode.FACE_MISMATCH]: 'Facial features do not match',
      [fioErrCode.WRONG_PIN_CODE]: 'Incorrect PIN code',
      [fioErrCode.TIMEOUT]: 'Operation timed out. Please try again',
      [fioErrCode.NETWORK_IO]: 'Network error. Please check your connection',
      [fioErrCode.UNAUTHORIZED]: 'Application is not authorized',
      [fioErrCode.TERMS_NOT_ACCEPTED]: 'Terms and conditions not accepted'
    };

    const message = errorMessages[errCode] || 'An unknown error occurred';
    setError(message);
    console.error('FACEIO Error:', errCode, message);
  };

  return {
    isReady,
    error,
    enrollEmployee,
    authenticateEmployee,
    clearError: () => setError(null)
  };
}