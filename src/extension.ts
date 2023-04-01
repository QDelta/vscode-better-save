import * as vscode from 'vscode';

async function betterSave() {
    const doc = vscode.window.activeTextEditor?.document;
    if (doc && doc.isDirty) {
        const contentOnDisk = await vscode.workspace.fs.readFile(doc.uri);
        const contentHere = Buffer.from(doc.getText());
        if (! contentHere.equals(contentOnDisk)) {
            doc.save();
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('better-save.save', betterSave);
    context.subscriptions.push(disposable);
}
