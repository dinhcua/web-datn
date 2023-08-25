import Analysis from 'api/Analysis';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';

AnalysisByMonth.propTypes = {};

const colors = ['#e28637', '#E84E40', '#03A9F4', '#e28637', '#E84E40', '#03A9F4', '#e28637', '#E84E40', '#03A9F4', '#e28637', '#E84E40', '#03A9F4'];

function AnalysisByMonth(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const { data } = await Analysis.byMonth();
            setData({
                time: data.time,
                data: data.data,
            });
            setLoading(false);
        } catch (error) {
            Toastr.error('Lỗi load dữ liệu thống kê theo tháng');
            console.error(error);
        }
    };
    return (
        <div className="panel panel-primary">
            <div className="panel-heading text-center">TÌNH HÌNH XỬ LÝ HỒ SƠ THEO THÁNG</div>
            <div className="panel-body">
                {loading && <div className="sp sp-page sp-circle"></div>}

                {!loading && (
                    <OwlCarousel className="owl-theme" loop margin={10} autoplay={true}>
                        {data.data.map((e, i) => (
                            <div key={i} className="item month-analysis" style={{ backgroundColor: colors[i] }}>
                                <div className="text-center">
                                    <span className="fa-stack fa-4x">
                                        <span className="fa fa-circle fa-stack-2x text-white"></span>
                                        <strong className="fa-stack-1x fa-inverse" style={{ color: '#444' }}>
                                            Tháng {i + 1}
                                        </strong>
                                    </span>
                                </div>

                                <div className="analysis-content">
                                    <p>
                                        Đã tiếp nhận: <b>{e.tiep_nhan}</b>
                                    </p>
                                    <p>
                                        Đã hoàn thành: <b>{e.hoan_thanh}</b>
                                    </p>
                                    <p>
                                        Hoàn thành đúng hạn: <b>{e.dung_han}</b>
                                    </p>
                                    <p>
                                        Quá hạn: <b>{e.qua_han}</b>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                )}
            </div>
        </div>
    );
}

export default AnalysisByMonth;
