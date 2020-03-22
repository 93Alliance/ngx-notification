export enum NotificationType {
    SUCCESS = 0,
    WARNING = 1,
    ERROR = 2,
    INFO = 3
}

export class Notification {
    constructor(
        public id: number,
        public type: NotificationType,
        public title: string,
        public message: string,
        public timeout: number
    ) {}
}

export type NotificationPosition = 't' | 'b' | 'lt' | 'lb' | 'rt' | 'rb';

// 这里由于和全局重名，所以叫notify。
export interface NotifyOptions {
    position?: NotificationPosition;
    startDistance?: number; // 通知框距离上面或者下面的距离
    animation?: boolean;
    shadow?: boolean;
    title?: {
        infoFontColor?: string,
        successFontColor?: string,
        warningFontColor?: string,
        errorFontColor?: string,
        background?: string;
        bold?: boolean;
    };
    msg?: {
        infoFontColor?: string,
        successFontColor?: string,
        warningFontColor?: string,
        errorFontColor?: string,
        background?: string;
        maxHeight?: number;
    };
    infoBgColor?: string;
    successBgColor?: string;
    warningBgColor?: string;
    errorBgColor?: string;
}

export const defaultNotifyOptions: NotifyOptions = {
    position: 'rt',
    startDistance: 0,
    animation: true,
    shadow: true,
    msg: {
        maxHeight: 200
    }
};

export enum ThemeName {
    DARK_WINDSTORM = 'darkWindstorm',
    MATERILA = 'material'
}

export const NotificationThemes = {
    darkWindstorm: {
        title: {
            infoFontColor: '#fff',
            successFontColor: '#fff',
            warningFontColor: '#fff',
            errorFontColor: '#fff',
            background: 'rgba(0, 0, 0, 0.6)',
            bold: true
        },
        msg: {
            infoFontColor: '#fff',
            successFontColor: '#fff',
            warningFontColor: '#fff',
            errorFontColor: '#fff',
            background: 'rgba(0, 0, 0, 0.4)'
        },
        infoBgColor: 'rgba(189, 189, 189, 0.9)',
        successBgColor: 'rgba(27, 158, 119, 0.9)',
        warningBgColor: 'rgba(217, 95, 2, 0.9)',
        errorBgColor: 'rgba(246, 71, 71, 0.9)'
    },
    material: {
        title: {
            infoFontColor: '#000',
            successFontColor: '#fff',
            warningFontColor: '#fff',
            errorFontColor: '#fff',
            background: 'rgba(0, 0, 0, 0)',
            bold: true
        },
        msg: {
            infoFontColor: '#000',
            successFontColor: '#fff',
            warningFontColor: '#fff',
            errorFontColor: '#fff',
            background: 'rgba(0, 0, 0, 0)'
        },
        infoBgColor: '#F5F5F5',
        successBgColor: '#009688',
        warningBgColor: '#F57C00',
        errorBgColor: '#D84315'
    },
};
