import React from 'react';

const MessagesContext = React.createContext();
MessagesContext.displayName = 'MessagesContext';

const MESSAGE_TYPES = {
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info',
};

// eslint-disable-next-line react/prop-types
export const MessagesProvider = ({ children }) => {
    const [messages, setMessages] = React.useState([]);

    const add = (text, type) => {
        setMessages((messages) => [
            ...messages,
            {
                text: text,
                type: type,
                id: Date.now(),
            },
        ]);
    };

    const dismiss = (id) => {
        setMessages((messages) =>
            messages.filter((message) => message.id !== id)
        );
    };

    const addInfo = (text) => {
        add(text, MESSAGE_TYPES.INFO);
    };

    const addSuccess = (text) => {
        add(text, MESSAGE_TYPES.SUCCESS);
    };

    const addError = (text) => {
        add(text, MESSAGE_TYPES.ERROR);
    };

    const contextValue = React.useMemo(() => {
        return {
            state: { messages },
            actions: {
                addInfo,
                addSuccess,
                addError,
                dismiss,
            },
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    return (
        <MessagesContext.Provider value={contextValue}>
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessageProvider = () => {
    const context = React.useContext(MessagesContext);

    if (!context) {
        throw new Error(
            'useMessageProvider must be used within a MessagesProvider'
        );
    }

    return context;
};
