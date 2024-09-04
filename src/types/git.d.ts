declare module "vscode" {
  export type GitExtension = {
    getAPI(version: number): API;
  };

  export type API = {
    repositories: Repository[];
  };

  export type Repository = {
    getBranches(): Promise<Branch[]>;
  };

  export type Branch = {
    name: string;
    remote: boolean;
    current: boolean;
  };
}
