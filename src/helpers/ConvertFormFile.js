export const ConvertFormFile = (data) => {
    const formData = new FormData();

    formData.append('id_procedure', data.procedure.id);
    formData.append('id_option', data.option.id);
    formData.append('user', JSON.stringify(data.user));
    formData.append('id_step', data.step.toString());
    formData.append('template_data', JSON.stringify(data.file.templateData));

    // for (let i = 0; i < data.file.attachs.length; i++) {
    //     formData.append(`file[${i}]`, data.file.attachs[i]);
    // }

    formData.append('file', data.file.attachs[0]);

    return formData;
};
