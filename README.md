# ProjectD
git init：初始化當前目錄
git status：檢查當前版本狀態
git add：加入版本控制
git commit -m "message" 直接建立新版本

小技巧：git commit -am　"message"
輸入 git commit -am "message" 可一次完成 add 和 commit 兩個指令動作。
但需注意：
-a 指令只對「已存在」的檔案有效；不適用於新加入的檔案（Untracked File）
若有新增的檔案，仍須先 add 再 commit ，才能把新檔加入版控

git log：查看版本紀錄
git checkout：切換到某個版本
.gitignore：忽略不要版本控制的檔案