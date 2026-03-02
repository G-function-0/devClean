# 📦 gwipe
Analyze and clean unused node_modules folders safely from your system.

gwipe is a fast CLI tool that scans your projects, identifies old node_modules folders, and helps you free up disk space — safely and interactively.

## 🚀 Why gwipe?
As developers, we:

* Create tons of side projects
* Experiment with new stacks
* Forget about old repos
* End up with gigabytes of unused node_modules

Reinstalling dependencies takes one command:

`npm install`

But finding and deleting old node_modules manually?
Painful.
gwipe solves that.

## ⚡ Features
* 🔍 Scan projects from any directory
* 🧠 Analyze project age and dependency size
* 🗑 Clean projects older than X days
* 🎯 Interactive multi-select deletion
* 🛡 Safe deletion (only removes node_modules)
* 🧾 Clear reports before any destructive action

## 📥 Installation
Global Install

`npm install -g @ujjawal-verma/gwipe`

## 🛠 Usage

### 🔍 Analyze Projects
Scan current directory:

`gwipe analyze`

Scan specific directory:

`gwipe analyze --dir D:/projects`

Deep scan entire home directory:

`gwipe analyze --deep`

### 🧹 Clean Old Projects
Delete node_modules older than 30 days:

`gwipe clean --deep --older-than 30`
Or
`gwipe clean --dir D:/projects --older-than 30`

You will be shown:

* List of eligible projects
* Total space to be freed
* Option to delete all or select specific projects
* Final confirmation before deletion

## 🛡 Safety
* Only node_modules folders are removed
* No project files are touched
* Interactive confirmation required
* Safe guards prevent accidental deletion

You can always reinstall dependencies with:

`npm install`

## 🧠 How It Works
* Recursively scans for projects containing package.json
* Detects presence of node_modules
* Calculates approximate folder size
* Determines project age
* Provides interactive deletion options

## 💡 Example Workflow

`gwipe clean --deep --older-than 60`

Output:

Found 5 projects older than 60 days
Total potential space to free: 3.2 GB

How would you like to proceed?
❯ Delete all listed projects
  Select specific projects to delete
  Cancel

## 🧑‍💻 Ideal For
* Developers with many side projects
* Students experimenting with frameworks
* Hackathon builders
* Anyone low on disk space

## 📦 Tech Stack
* Node.js
* TypeScript
* Commander
* @inquirer/prompts

## 🤝 Contributing
Pull requests are welcome.

If you find a bug or have a feature request, open an issue.

## 📄 License
MIT License

## ⭐ Support
If this tool saved you some GBs, consider starring the repo or sharing it with other developers.
EOF