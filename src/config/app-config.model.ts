export interface IAppConfig {
    IdP: {
        Url: string;
        ClientId: string;
        Scope: string;
        ShowDebugInformation: boolean;
        RedirectUri: string
    };
    Resource:{
        Url:string
    }
}