import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { onClose } = useDisclosure();

  useEffect(() => {
    if (location.pathname === '/match/comp/admin') {
      navigate('match/comp/admin');
    } else {
      navigate('match');
    }
  }, []);

  return (
    <div className="h-full">
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div className="flex flex-col gap-8 justify-center ">
            <Modal backdrop={'blur'} isOpen={true} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Error occured when render
                    </ModalHeader>
                    <ModalBody>
                      <blockquote className="mt-2 mb-2 border-l-2 pl-6">
                        <strong>{error.message}</strong>
                      </blockquote>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onPress={() => {
                          onClose();
                          window.location.href = '/';
                          resetErrorBoundary();
                        }}
                      >
                        Reload
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        )}
      >
        <div className="flex flex-col ">
          <div>
            <Outlet />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
