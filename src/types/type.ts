export type LoginResponse = {
  responseResult: boolean;
  message: string;
  data: {
    token: string;
    id_user: string;
    username: string;
    nama_lengkap: string;
    role: string;
    menuAkses: [
      {
        mn_user_menu_id: string;
        menu_name: string;
        url: string;
        no_urut: number;
        child: [];
      },
    ];
  };
};
