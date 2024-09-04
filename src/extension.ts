import * as vscode from "vscode";
import { GitExtension } from "vscode";
export async function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "avs-work-logging-tool.avsWorkLoggingTool",
    async () => {
      const gitExtension =
        vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;

      if (!gitExtension) {
        vscode.window.showErrorMessage("Git extension not found!");
        return;
      }

      const git = gitExtension.getAPI(1);

      const repo = git.repositories[0];
      if (!repo) {
        vscode.window.showErrorMessage("No Git repository found!");
        return;
      }

      const branches = await repo.getBranches();
      const branchNames = branches.map((branch) => branch.name);

      vscode.window.showInformationMessage(
        `Branches: ${branchNames.join(", ")}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
