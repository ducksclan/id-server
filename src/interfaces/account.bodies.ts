export interface LoginBody {
    email: string;
}

export interface CodeBody {
    code: string;
}

export interface AccountGetBody {
    user_id: string;
    email: string;
    created_at: Date;
    verified_at: Date | null;
    user_status: 'Not Verified' | 'Normal' | 'Admin' | 'Super Admin';
}
