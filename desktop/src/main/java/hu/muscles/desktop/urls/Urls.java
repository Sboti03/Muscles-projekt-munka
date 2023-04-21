package hu.muscles.desktop.urls;


public class Urls {
    public Urls() {}



    public final String LOGIN() {
        return "http://34.22.242.178:3000/api/auth/login";
    }
    public final String LOGOUT() {
        return "http://34.22.242.178:3000/api/auth/logut";
    }



    public final String GET_ALL_FOOD() {
        return "http://34.22.242.178:3000/api/admin/food";
    }
    public final String CREATE_FOOD() {
        return "http://34.22.242.178:3000/api/admin/food/";
    }
    public final String UPDATE_FOOD(int id) {
        return String.format("http://34.22.242.178:3000/api/admin/food/%d", id);
    }
    public final String DELETE_FOOD(int id) {
        return String.format("http://34.22.242.178:3000/api/admin/food/%d", id);
    }
    public final String UNDELETE_FOOD(int id) { return String.format("http://34.22.242.178:3000/api/admin/food/undelete/%d", id); }



    public final String GET_ALL_PROFILE() {
        return "http://34.22.242.178:3000/api/admin/profile/all";
    }
    public final String GET_PROFILE_BY_ID(int id) { return String.format("http://34.22.242.178:3000/api/profile/admin/id/%d", id); }



    public final String GET_ALL_USER() { return "http://34.22.242.178:3000/api/admin/user/all"; }
    public final String GET_USER_BY_USERID(int id) { return String.format("http://34.22.242.178:3000/api/admin/user/%d", id); }
    public final String DELETE_USER(int id) {
        return String.format("http://34.22.242.178:3000/api/admin/user/%d", id);
    }
    public final String BLOCK_USER(int id) { return String.format("http://34.22.242.178:3000/api/admin/user/block/%d", id); }
    public final String UNBLOCK_USER(int id) { return String.format("http://34.22.242.178:3000/api/admin/user/unblock/%d", id); }

}
