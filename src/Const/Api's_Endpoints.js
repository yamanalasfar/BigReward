
const Server = 'https://cashgames.website/api';
const Endpoints = {
    Ip : 'http://ip-api.com/json/',
    Register: Server + '/register',
    Login: Server + '/login',
    ResetPassword: Server + '/forget',
    HomePage: Server + '/connect',
    GiftsPage: Server + '/gift/get',
    Balance: Server + '/me/balance',
    ActivityPage: Server + '/gift/get',
    ProfileDetails: Server + '/profile',
    UpdateProfile: Server + '/profile/update',
    Avatar: Server + '/profile/update/avatar',
    DeleteProfile: Server + '/me/del'
}
export default Endpoints;