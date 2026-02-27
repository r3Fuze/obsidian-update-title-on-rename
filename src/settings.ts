import { App, PluginSettingTab, Setting } from "obsidian";
import UpdateTitlePlugin from "./main";

export interface UpdateTitlePluginSettings {
	alwaysUpdateTitle: boolean;
	titlePropertyName: string;
	addTitleToFrontmatter: boolean;
}

export const DEFAULT_SETTINGS: UpdateTitlePluginSettings = {
	alwaysUpdateTitle: false,
	titlePropertyName: "title",
	addTitleToFrontmatter: false,
}

export class UpdateTitlePluginSettingTab extends PluginSettingTab {
	constructor(app: App, readonly plugin: UpdateTitlePlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Always update the title")
			.setDesc("Updates the title even if it doesn't match the previous filename. Overwrites custom titles.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.alwaysUpdateTitle)
				.onChange(async (value) => {
					this.plugin.settings.alwaysUpdateTitle = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Title property name")
			.setDesc("Frontmatter key used to store the file title.")
			.addText(text => text
				// eslint-disable-next-line obsidianmd/ui/sentence-case
				.setPlaceholder("title")
				.setValue(this.plugin.settings.titlePropertyName)
				.onChange(async (value) => {
					this.plugin.settings.titlePropertyName = value || DEFAULT_SETTINGS.titlePropertyName;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Add title to frontmatter")
			.setDesc("Adds the title to frontmatter when renaming a file, if no title exists.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.addTitleToFrontmatter)
				.onChange(async (value) => {
					this.plugin.settings.addTitleToFrontmatter = value;
					await this.plugin.saveSettings();
				}));
	}
}
