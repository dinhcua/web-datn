import $ from 'jquery';

export const smoothScroll = (select) => {
    $('html, body').animate(
        {
            scrollTop: select ? $(select).offset().top : 0,
        },
        300
    );
};
