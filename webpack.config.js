// 1.引入一个包, nodejs中的一个模块，用来拼接路径
const path = require('path');

// 在webpack的配置文件中，引入刚刚下载的html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 引入 clean-webpack-plugin插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 2.正式编写配置信息

// webpack中所有的配置信息，都应该写在module.exports中
module.exports = {

    // entry:指定入口文件，一般在项目下会有一个src文件夹，表示源码，里面有一个index.ts文件，表示入口文件
    entry: "./src/index.ts",

    // 打包，就是把文件输出到一个指定目录
    //指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        //打包后的文件名
        filename: "bundle.js",

        // 告诉webpack，不使用箭头函数, 不使用const(为了兼容一些老版本的浏览器)
        environment: {
            arrowFunction: false,
            const: false
        }
    },

    //webpack打包时要使用的模块
    module:{
        //指定要加载的规则
        rules:[
            {
                //test指定的是规则生效的文件
                test:/\.ts$/,
                //要使用的loader.加载器从后向前执行，先用ts-loader将ts转为js，然后用babel-loader做适配
                use: [
                    {
                        // 配置babel， 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    // 1. targets: 要兼容的目标浏览器，这里就不必在管tsconfig.json中的target了
                                    {
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // "corejs"指定版本
                                        // 比如在源码ts中使用了Promise，而ie11中并没有这个概念，那么根据配置信息，
                                        // corejs中就会调用自己实现的promise来转换代码，以适配ie11浏览器
                                        "corejs": "3",
                                        // useBuiltIns, 使用corejs的方式，usage，表示按需加载
                                        "useBuiltIns": "usage"

                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //指定要排除的文件
                exclude: /node_modules/
            },
            // 设置less文件的处理, 从下向上
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入 postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                      "postcss-preset-env",  
                                      {
                                        browsers: 'last 2 versions'
                                      }
                                    ]
                                    
                                    
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置webpack的插件. 作用就是自动创建html文件，并引入相关的资源.执行 npm run build 命令就可以看到变化
    // 在构造函数中，传入一个对象，用来对创建html时做一些配置
    // 如果有多个网页需要构建时，可以使用网页模板。方法：在任意位置定义一个html文件作为模板，模板的格式，包含的元素等配置好

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            template: "./src/index.html"
        }),
    ],

    // resolve 用来设置引用的模块
    resolve: {
        extensions: ['.ts', '.js']
    }
};