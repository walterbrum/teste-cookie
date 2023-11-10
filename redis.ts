import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar, Cookie } from 'tough-cookie';
import { RedisClientType, createClient } from 'redis';
import RedisCookieStore from '@ijs/tough-cookie-redis-store';
import { HttpCookieAgent, HttpsCookieAgent } from 'http-cookie-agent/http';

async function teste() {
  try {
    const redisClient: RedisClientType = createClient({
        socket: {
            host:'master.redis-dev-rb.jel1ly.sae1.cache.amazonaws.com',
            port: 6379,
            tls: true
        },
        password: 'Mkd3nE2XCGICPDT5',
    })

    await redisClient.connect()
    
    // const jar = new CookieJar();
    const myJar = new CookieJar(new RedisCookieStore(redisClient, 'my-cookie-store'));
    
    var toughCookie = Cookie
    var cookie = Cookie.parse('')
    cookie.value = 'somethingdifferent'
    myJar.setCookie(
      cookie,
      'https://currentdomain.example.com/path',
    )
    var cookies = await cookiejar.getCookies('https://example.com/otherpath')

    // const axiosCookie = axios.create({
    //   httpAgent: new HttpCookieAgent({ cookies: { async_UNSTABLE: true, myJar } }),
    //   httpsAgent: new HttpsCookieAgent({ cookies: { async_UNSTABLE: true, myJar } }),
    // });


    const response = await axiosCookie.get('https://px.ads.linkedin.com/collect?v=2&fmt=js&pid=4539089&time=1699638030536&url=https%3A%2F%2Fwww.ticket.com.br%2Flogin%2F');

    console.log('cookies', await myJar.getCookies('https://px.ads.linkedin.com/collect?v=2&fmt=js&pid=4539089&time=1699638030536&url=https%3A%2F%2Fwww.ticket.com.br%2Flogin%2F'))

    await redisClient.disconnect();
  } catch (error) {
    console.error('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX', error);
  }
}

teste();
