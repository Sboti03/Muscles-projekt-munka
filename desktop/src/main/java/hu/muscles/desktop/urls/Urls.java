package hu.muscles.desktop.urls;


public class Urls {
    public Urls() {
    }

    private String BASE_URL() {
           return "http://localhost:3000"; // Local backend
        // return "http://34.22.242.178:3000"; // Google Cloud backend
    }


    public final String LOGIN() {
        return BASE_URL() + "/api/auth/login";
    }

    public final String LOGOUT() {
        return BASE_URL() + "/api/auth/logout";
    }


    public final String GET_ALL_FOOD() {
        return BASE_URL() + "/api/admin/food";
    }

    public final String CREATE_FOOD() {
        return BASE_URL() + "/api/admin/food/";
    }

    public final String UPDATE_FOOD(int id) {
        return String.format(BASE_URL() + "/api/admin/food/%d", id);
    }

    public final String DELETE_FOOD(int id) {
        return String.format(BASE_URL() + "/api/admin/food/%d", id);
    }

    public final String UNDELETE_FOOD(int id) {
        return String.format(BASE_URL() + "/api/admin/food/undelete/%d", id);
    }


    public final String GET_ALL_PROFILE() {
        return BASE_URL() + "/api/admin/profile/all";
    }

    public final String GET_PROFILE_BY_ID(int id) {
        return String.format(BASE_URL() + "/api/profile/admin/id/%d", id);
    }


    public final String GET_ALL_USER() {
        return BASE_URL() + "/api/admin/user/all";
    }

    public final String GET_USER_BY_USERID(int id) {
        return String.format(BASE_URL() + "/api/admin/user/%d", id);
    }

    public final String DELETE_USER(int id) {
        return String.format(BASE_URL() + "/api/admin/user/%d", id);
    }

    public final String BLOCK_USER(int id) {
        return String.format(BASE_URL() + "/api/admin/user/block/%d", id);
    }

    public final String UNBLOCK_USER(int id) {
        return String.format(BASE_URL() + "/api/admin/user/unblock/%d", id);
    }

}
