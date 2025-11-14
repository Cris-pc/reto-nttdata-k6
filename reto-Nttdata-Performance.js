import http from 'k6/http';
import { check, sleep } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';

export let options = {
    vus: 20,                  // 20 usuarios virtuales
    duration: '1m',           // prueba de 1 minuto debe alcanzar los 20 tps ---20 TPS × 60 segundos = 1200 peticiones
    thresholds: {
        http_req_duration: ['p(95)<1500'],  // 95% de solicitudes < 1.5s esto en base a lo requerido
        http_req_failed: ['rate<0.03'],     // errores < 3%
    },
};


const csvData = new SharedArray('users', function () {
    return papaparse.parse(open('./data/users.csv'), { header: true }).data;
});

export default function () {
    const user = csvData[Math.floor(Math.random() * csvData.length)];

    const url = 'https://fakestoreapi.com/auth/login';
    const payload = JSON.stringify({
        username: user.user,
        password: user.passwd
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
        timeout: '60s'
    };

    const res = http.post(url, payload, params);

    // asserciones verificacion de la respuesta del servicio y que que
    check(res, {
        'status 201': (r) => r.status === 201, // respuesta del servicio
        'respuesta < 1.5s': (r) => r.timings.duration < 1500, //El tiempo de respuesta permitido es de máximo 1,5 segundos.
    });

    sleep(0.05); // para lograr aprox 20 TPS
}