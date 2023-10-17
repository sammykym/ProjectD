# ProjectD
git init：初始化當前目錄
git status：檢查當前版本狀態
git add：加入版本控制
git commit -m "message" 直接建立新版本

情境一：從本地數據庫添加遠端數據庫
1.在本地用了 git init 建立數據庫
2.新增了兩個 commit
3.在 GitHub 建立了一個遠端數據庫
4.使用 git remote add <url>，在本地數據庫添加遠端數據庫
5.使用 git push origin master 指令推送到 GitHub 更新

情境二：先在 GitHub 上建立遠端數據庫，再 clone 下來
1.在 GitHub 建立了一個遠端數據庫
2.使用 git clone <url> 指令，抓取一份數據庫下來在本地
3.新增了兩個 commit 在本地數據庫
4.使用 git push origin master 指令推送到 GitHub 更新

小技巧：git commit -am　"message"
輸入 git commit -am "message" 可一次完成 add 和 commit 兩個指令動作。
但需注意：
-a 指令只對「已存在」的檔案有效；不適用於新加入的檔案（Untracked File）
若有新增的檔案，仍須先 add 再 commit ，才能把新檔加入版控

git log：查看版本紀錄
git checkout：切換到某個版本
.gitignore：忽略不要版本控制的檔案
