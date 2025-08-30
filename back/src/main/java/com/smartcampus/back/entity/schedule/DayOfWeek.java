package com.smartcampus.back.entity.schedule;

public enum DayOfWeek {
    MONDAY(1), TUESDAY(2), WEDNESDAY(3), THURSDAY(4), FRIDAY(5);

    private final int code;

    DayOfWeek(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static DayOfWeek of(int code) {
        return switch (code) {
            case 1 -> MONDAY;
            case 2 -> TUESDAY;
            case 3 -> WEDNESDAY;
            case 4 -> THURSDAY;
            case 5 -> FRIDAY;
            default -> throw new IllegalArgumentException("잘못된 요일 코드: " + code);
        };
    }
}
