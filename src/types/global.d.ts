interface Window {
  FB: {
    init: (params: {
      appId: string;
      cookie: boolean;
      xfbml: boolean;
      version: string;
    }) => void;
    login: (callback: (response: any) => void, params: { scope: string }) => void;
    api: (
      path: string,
      params: { fields: string; access_token: string },
      callback: (response: any) => void
    ) => void;
    getLoginStatus: (callback: (response: any) => void) => void;
    XFBML: {
      parse: () => void;
    };
  };
  fbAsyncInit: () => void;
}