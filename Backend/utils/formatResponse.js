export const formatCourseResponse = (course) => {
    if (!course) return null;

    return {
        ...course,
        id: course._id.toString(),
        _id: undefined,
        outline: course.outline.map((item) => ({
            id: item._id?.toString(),
            _id: undefined,
            point: item.point,
        })),
    };
};


export const formatCoursesResponse = (courses) => {
    return courses.map(formatCourseResponse)
}