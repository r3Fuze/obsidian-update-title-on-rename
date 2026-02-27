import { Plugin, TAbstractFile, TFile } from "obsidian";
import { DEFAULT_SETTINGS, UpdateTitlePluginSettings, UpdateTitlePluginSettingTab } from "./settings";

export default class UpdateTitlePlugin extends Plugin {
	settings: UpdateTitlePluginSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new UpdateTitlePluginSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			this.registerEvent(this.app.vault.on("rename", this.onRename.bind(this)));
		})
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<UpdateTitlePluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onRename(file: TAbstractFile, oldPath: string) {
		if (!(file instanceof TFile)) return;
		
		const oldFileName = oldPath.slice(oldPath.lastIndexOf("/") + 1).replace(/\.md$/, "");
		const newFileName = file.basename;

		this.app.fileManager.processFrontMatter(file, (frontmatter: Record<string, unknown>) => {
			const { titlePropertyName, addTitleToFrontmatter, alwaysUpdateTitle } = this.settings;
			const currentTitle = frontmatter[titlePropertyName];

			if (!currentTitle) {
				if (addTitleToFrontmatter) {
					frontmatter[titlePropertyName] = newFileName;
				}

				return;
			}

			if (currentTitle === oldFileName || alwaysUpdateTitle) {
				frontmatter[titlePropertyName] = newFileName;
			}
		}).catch(console.error);
	}
}
