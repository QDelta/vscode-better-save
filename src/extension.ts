import * as vscode from 'vscode';

async function betterSave(currEditor: vscode.TextEditor) {
    const doc = currEditor.document;
    const conf = vscode.workspace.getConfiguration('better-save');
    if (doc.isDirty) {
        const contentOnDisk = await vscode.workspace.fs.readFile(doc.uri);
        const contentHere = Buffer.from(doc.getText());
        if (! contentHere.equals(contentOnDisk)) {
            doc.save();
        } else if (conf.get('promptDirty') as boolean) {
            vscode.window.showInformationMessage(
                "better-save: File content unchanged, skip (" + doc.fileName + ")"
            );
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerTextEditorCommand('better-save.save', betterSave);
    context.subscriptions.push(disposable);
}
