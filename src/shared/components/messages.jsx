import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useMessageProvider } from '../context/messages-provider';

const MessagesStack = styled('div')`
    display: flex;
    flex-flow: column;
    gap: 15px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
`;

const StyledAlert = styled(Alert)`
    width: 100%;

    @media (min-width: 767px) {
        width: 30%;
    }
`;

export const Messages = () => {
    const { state, actions } = useMessageProvider();
    const { messages } = state;
    const { dismiss } = actions;

    return (
        <MessagesStack>
            {messages.length > 0
                ? messages.map((message) => {
                      return (
                          <Snackbar
                              key={message.id}
                              open={messages.length > 0}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                              autoHideDuration={2000}
                              sx={{ width: '100%', position: 'initial' }}
                              onClose={() => dismiss(message.id)}
                          >
                              <StyledAlert
                                  key={message.id}
                                  elevation={6}
                                  severity={message.type}
                                  sx={{ width: '100%' }}
                                  variant="filled"
                              >
                                  {message.text}
                              </StyledAlert>
                          </Snackbar>
                      );
                  })
                : null}
        </MessagesStack>
    );
};
