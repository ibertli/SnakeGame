# 由于我当前目录下有package.json,要配置运行环境，首先需要下载依赖，执行： npm install 就可以将package.json中的
# 所有依赖下载下来；和在github上clone一个别人的项目，在本地配置环境时，也要先npm i 才行；
# (注意，在当前windows环境下，假如有一个项目的配置文件是完整的，我需要拷贝下来使用，一定要包含：
# package.json, package-lock.json, tsconfig.json, webpack.config.js)

# 1. 在项目目录下 npm init -y 初始化项目，生成 package.json
# 2. 先下四个依赖： npm i -D webpack webpack-cli typescript ts-loader,
# 3. 然后下载 npm i -D html-webpack-plugin
# 4. npm i -D webpack-dev-server
# 5. npm i -D clean-webpack-plugin
# 6. npm i -D @babel/core @babel/preset-env babel-loader core-js

# 2021.3.22 贪食蛇项目，需要在webpack中配置css相关的依赖，这里根据教程，使用的 less
# npm i -D less less-loader css-loader style-loader
# 然后，针对样式，仍然要考虑的是浏览器的适配问题，所以还需要下载postcss插件处理
# npm i -D postcss postcss-loader postcss-preset-env

# 以贪食蛇为例，了解项目的开发流程：有了设计图，搭建游戏界面，两种选择：1. html,div等，统统在js中设置，
# 通过拼串，实现样式，优点是灵活度比较高，缺点是写起来麻烦，加载起来，没有直接写html快，
# 2. 传统的方法，结构，表现 行为分离

# 将一个类定义为一个模块，便于后期的维护