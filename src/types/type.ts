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

export type GetAllDataResponse = {
  responseResult: boolean;
  message: string;
  data: {
    id_banner_ads_package: string;
    package_name: string;
    package_description: string;
    package_price: number;
    package_duration: number;
    created_at: string;
    package_is_active: number;
    from_admin: boolean;
  }[];
};

export type CreateDataResponse = {
  responseResult: boolean;
  message: string;
  data: object;
};
