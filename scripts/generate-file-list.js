const fs = require('fs').promises;
const path = require('path');

/**
 * 读取指定文件夹中的所有文件名，并生成index.json文件
 * @param {string} folderPath - 要读取的文件夹路径
 */
async function generateFileList(folderPath) {
    try {
        // 解析为绝对路径，便于后续操作
        const absoluteFolderPath = path.resolve(folderPath);
        
        // 验证文件夹是否存在
        await fs.access(absoluteFolderPath);
        
        // 读取文件夹中的所有文件和子文件夹
        const files = await fs.readdir(absoluteFolderPath);
        
        // 获取文件夹的父目录
        const parentDir = path.dirname(absoluteFolderPath);
        
        // 生成要写入JSON的数据
        const fileList = {
            folder: path.basename(absoluteFolderPath),
            path: absoluteFolderPath,
            count: files.length,
            files: files,
            generatedAt: new Date().toISOString()
        };
        
        // 生成JSON文件路径（与目标文件夹同级）
        console.log('parentDir', parentDir);
        const jsonFilePath = path.join(parentDir, 'index.json');
        
        // 写入JSON文件，缩进2个空格以提高可读性
        await fs.writeFile(jsonFilePath, JSON.stringify(fileList, null, 2), 'utf8');
        
        console.log(`成功生成文件: ${jsonFilePath}`);
        console.log(`共读取到 ${files.length} 个文件/文件夹`);
    } catch (err) {
        console.error('操作失败:', err.message);
        process.exit(1); // 非0退出码表示执行失败
    }
}

// 获取命令行参数中的文件夹路径
// process.argv 是一个数组，包含 [node路径, 脚本路径, 第一个参数, 第二个参数, ...]
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('请指定要读取的文件夹路径！');
    console.log('使用方法: node generate-file-list.js <文件夹路径>');
    console.log('示例: node generate-file-list.js ./docs');
    process.exit(1);
}

// 取第一个参数作为目标文件夹路径
const targetFolder = args[0];

// 执行函数
generateFileList(targetFolder);
