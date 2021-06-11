const copyCodeHandler = (code: string, toast: any) => {
  if (window.navigator) {
    navigator.clipboard.writeText(code);
    toast({
      status: "success",
      title: "BAŞARI",
      description: "Bağlantı başarıyla kopyalandı",
      position: "top",
    });
  } else {
    toast({
      status: "error",
      title: "HATA",
      description: "Tarayıcınız bu özelliği desteklemiyor",
      position: "top",
    });
  }
};

export { copyCodeHandler };
