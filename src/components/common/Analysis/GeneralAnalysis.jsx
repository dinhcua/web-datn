import Analysis from 'api/Analysis';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';

GeneralAnalysis.propTypes = {};

function GeneralAnalysis(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const { data } = await Analysis.general();
            setData({
                time: data.time,
                labels: data.labels,
                datasets: [
                    {
                        label: '# of Votes',
                        data: data.data,
                        backgroundColor: ['#34A853', '#ff3232', '#3273ff', '#eddd4e'],
                        borderColor: ['#027002', '#700202', '#052f89', '#a09000'],
                        borderWidth: 1,
                    },
                ],
            });
            setLoading(false);
        } catch (error) {
            Toastr.error('Lỗi load dữ liệu thống kê chung');
            console.error(error);
        }
    };

    return (
        <div className="panel panel-primary">
            <div className="panel-heading text-center">TÌNH HÌNH XỬ LÝ HỒ SƠ NĂM {new Date().getFullYear()}</div>
            <div className="panel-body">
                {loading && <div className="sp sp-page sp-circle"></div>}

                {!loading && (
                    <>
                        <Pie data={data} />

                        <div className="text-center mt-1" style={{ color: '#999' }}>
                            Cập nhật: {moment(data?.time).format('hh:mm:ss A DD-MM-YYYY')}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default GeneralAnalysis;
