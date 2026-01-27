type ClientEvents = {
    "client.message": {
        message: string;
    };
};

type ChatGroup = {
    refId: string;
    name: string;
};
type UserEvents = {
    "user.sign-in": {
        data: {
            userRefId: string;
            spaceRefId: string;
            apiKey: string;
            userName: string;
        };
    };
    "user.chat-open": {
        chat: ChatGroup[];
        instructions?: string;
        config?: {
            size?: {
                width: number;
                height: number;
            };
            position?: {
                x: number;
                y: number;
            };
            draggable?: boolean;
            resizable?: boolean;
        };
    };
    "user.chat-close": null;
    "user.module-toggle": {
        type: "open" | "close";
    };
};

interface Config {
    name: string;
    icons: {
        avatar?: string;
        chatbot?: string;
    };
    token: string;
    chatbot?: {
        faq: string[];
        instructions?: string;
    };
}

type RequiredConfigs = Partial<Config> & {
    token: string;
};
type OptionalConfigs = {
    style?: Partial<CSSStyleDeclaration>;
    debug?: boolean;
};
declare class TimelyChat {
    private element;
    private eventBus;
    private targetElement;
    private optionalConfigs?;
    constructor(targetElement: HTMLElement, requiredConfigs: RequiredConfigs, optionalConfigs?: OptionalConfigs);
    private elementSetting;
    private init;
    static getToken(configs: {
        name: string;
        providerId: string;
        apiKey: string;
        spaceRefId: string;
    }): Promise<string>;
    toggleMount(): void;
    open(): void;
    close(): void;
    toggleVisibility(): void;
    show(): void;
    hide(): void;
    send<T extends keyof UserEvents extends `user.${infer K}` ? K : never, J extends UserEvents[`user.${T}`]>(eventName: T, ...data: J extends object | string | number ? [J] : []): void;
    on<T extends keyof ClientEvents extends `client.${infer K}` ? K : never, J extends (data: ClientEvents[`client.${T}`]) => void>(eventName: T, ...callback: J extends (...args: infer U) => void ? [callback: (data: U) => void] : []): void;
}

declare global {
    interface Window {
        TimelyChat: typeof TimelyChat;
    }
}

export { TimelyChat as default };
