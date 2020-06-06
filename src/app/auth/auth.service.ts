import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AppConfig } from 'src/config/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: AppConfig.settings.IdP.Url,

    // URL of the SPA to redirect the user to after login
    redirectUri: AppConfig.settings.IdP.RedirectUri,

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: AppConfig.settings.IdP.ClientId,

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: AppConfig.settings.IdP.Scope,

    showDebugInformation: AppConfig.settings.IdP.ShowDebugInformation,

    // Not recommended:
    // disablePKCI: true,
  };

  constructor(private oauthService: OAuthService) { 
    this.oauthService.configure(this.authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    this.oauthService.initCodeFlow();    
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }
}
