/**
 * @description: 选择文件
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export function selectFiles(options: {
  accept?: string;
  capture?: string;
  multiple?: boolean;
}): Promise<FileList | null> {
  return new Promise((resolve) => {
    let files: any;
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = options.multiple!;
    input.accept = options.accept!;
    input.click();
    input.onchange = (event: Event) => {
      const result = event.target as HTMLInputElement;
      files = result.files;
      resolve(result.files);
    };
  });
}

/**
 * @description: 图片文件转字符串
 * @param {Blob|File} file 文件
 * @return {String}
 */
export function getImgStr(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to convert file to string"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    // 以DataURL的形式读取文件（即Base64编码）
    reader.readAsDataURL(file);
  });
}

/**
 * @description: 创建图片元素
 * @param { string  } str 图片地址或者base64图片
 * @return {Promise} element 图片元素
 */
export function insertImgFile(str: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const imgEl = document.createElement("img");
    imgEl.src = str;
    // 插入页面
    document.body.appendChild(imgEl);
    imgEl.onload = () => {
      resolve(imgEl);
    };
  });
}
