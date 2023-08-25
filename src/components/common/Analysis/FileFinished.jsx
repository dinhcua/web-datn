import Analysis from 'api/Analysis';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import $ from 'jquery';
import { Link } from 'react-router-dom';

FileFinished.propTypes = {};

function FileFinished(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const { data } = await Analysis.fileFinished();
            setData(data);
            setLoading(false);
        } catch (error) {
            Toastr.error('Lỗi load dữ liệu hồ sơ đã xử lý');
            console.error(error);
        }
    };
    return (
        <div className="panel panel-primary">
            <div className="panel-heading text-center">HỒ SƠ ĐÃ GIẢI QUYẾT</div>
            <div className="panel-body">
                {loading && <div className="sp sp-page sp-circle"></div>}

                {!loading && <AutoScroll data={data} />}
            </div>
        </div>
    );
}

function AutoScroll(props) {
    const { data } = props;

    useEffect(() => {
        var tickerHeight = $('.autoscroll .ctn ul li').outerHeight();
        $('.autoscroll .ctn ul li:last-child').prependTo('.autoscroll .ctn ul');
        $('.autoscroll .ctn ul').css('marginTop', -tickerHeight);
        function moveTop() {
            $('.autoscroll .ctn ul').animate(
                {
                    top: -tickerHeight,
                },
                600,
                function () {
                    $('.autoscroll .ctn ul li:first-child').appendTo('.autoscroll .ctn ul');
                    $('.autoscroll .ctn ul').css('top', '');
                }
            );
        }

        var itv = setInterval(function () {
            moveTop();
        }, 3000);

        return () => {
            clearInterval(itv);
        };
    }, []);

    return (
        <div className="autoscroll">
            <div className="ctn">
                <ul>
                    {data.map((e, i) => (
                        <li key={i}>
                            <div className="item">
                                <Link to={`/chi-tiet-ho-so/${e.id}`}>
                                    <div className="row">
                                        <div className="col-xs-6 text-uppercase">{e.user_info.full_name}</div>
                                        <div className="col-xs-6 text-right" style={{ fontStyle: 'italic', color: '#ccc' }}>
                                            {e.key}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileFinished;
