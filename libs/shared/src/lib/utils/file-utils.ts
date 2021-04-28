export function formDataFromFileList(fileList: FileList): FormData {
  const data = new FormData();

  for (let i = 0; i < fileList.length; i++) {

    const file = fileList[i];

    data.append('file[]', file, file.name);
  }

  return data;
}

export function formDataForFile(name: string, file: File): FormData {

  const formData: FormData = new FormData();
  formData.append(name, file, file.name);

  return formData;
}
