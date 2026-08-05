package com.ems.employeemanagement.util;

public final class AppConstants {

    public static final String API_BASE_PATH = "/api";
    public static final String DEPARTMENTS_PATH = API_BASE_PATH + "/departments";
    public static final String EMPLOYEES_PATH = API_BASE_PATH + "/employees";
    public static final String DASHBOARD_PATH = API_BASE_PATH + "/dashboard";

    public static final String DEFAULT_PAGE = "0";
    public static final String DEFAULT_SIZE = "10";
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_DIRECTION = "asc";

    private AppConstants() {
    }
}
