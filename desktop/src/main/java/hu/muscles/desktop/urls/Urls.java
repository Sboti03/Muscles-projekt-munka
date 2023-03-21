package hu.muscles.desktop.urls;

public class Urls {

    public final String LOGIN() {
        return "http://34.22.242.178:3000/api/auth/login";
    }

    public final String LOGOUT() {
        return "http://34.22.242.178:3000/api/auth/logut";
    }

    public final String GET_ALL_FOOD() {
        return "http://34.22.242.178:3000/api/food";
    }
    public final String GET_ALL_PROFILE() {
        return "http://34.22.242.178:3000/api/profile/admin/all";
    }
    public final String GET_PROFILE_BY_ID() {
        return "http://34.22.242.178:3000/api/profile/admin/id/:id";
    }
}
