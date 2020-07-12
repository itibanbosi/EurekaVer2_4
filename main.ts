enum eureka_IO {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
  Cﾎﾟｰﾄ,
}
enum eureka_denki {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
}
enum eureka_tlp {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
}
enum eureka_p1416 {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
}
enum onoff {
  ON,
  OFF,
}
enum moter_d {
  ﾏｴ,
  ｳｼﾛ,
  ﾏｴ_ﾋﾀﾞﾘ,
  ﾏｴ_ﾐｷﾞ,
  ｳｼﾛ_ﾋﾀﾞﾘ,
  ｳｼﾛ_ﾐｷﾞ,
  ﾃｲｼ,
}
enum etc {
  AKARUSA,
  JINKAN,
}
enum L9110moter {
  seiten,
  gyakuten,
  seisi,
}
let con_le=0;
let con_op=0;

//% color="#74ad1d" block="ﾕｰﾚｶﾌﾞﾛｯｸ2.3"
namespace eureka_blocks {
  //% color="#4741f1" weight=54 blockId=eureka_tl_blue block="青信号 点灯|%mode| |%pin|" group="1_信号機ユニット"
  export function eureka_tl_blue(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P14, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P14, 0);
        }
      case eureka_tlp.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P16, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P16, 0);
        }
    }
  }
  //% color="#ffa800" weight=53 blockId=eureka_tl_yellow block="黄信号 点灯|%mode| |%pin|" group="1_信号機ユニット"
  export function eureka_tl_yellow(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P13, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P13, 0);
        }
      case eureka_tlp.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
  }
  //% color="#ff4940" weight=52 blockId=eureka_tl_red block="赤信号 点灯|%mode| |%pin|" group="1_信号機ユニット"
  export function eureka_tl_red(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_tlp.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
    }
  }

  //% color="#1E90FF" weight=51 block="待ち時間（秒）|%second|" group="1_信号機ユニット"
  //% second.min=0 second.max=20
  export function driveForwards(second: number): void {
    basic.pause(second * 1000);
  }
  //% color="#009A00"  weight=27 block="光ｾﾝｻ値 |%limit| より暗い |%tlp|" group="2_電気の利用ユニット"
  //% limit.min=0 limit.max=100
  export function decideLight(limit: number, tlp: eureka_tlp): boolean {
    switch (tlp) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_tlp.Bﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }
  //% color="#009A00"  weight=26 blockId=eureka_denkitemp block="光ｾﾝｻ |%pin|" group="2_電気の利用ユニット"
  export function eureka_denkitemp(pin: eureka_denki): number {
    switch (pin) {
      case eureka_denki.Aﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
      case eureka_denki.Bﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }
  }
  //% color="#009A00" weight=25 block="人が動いたら |%pin|" group="2_電気の利用ユニット"
  if (true) {
  } else {
  }
  export function humanDetection(pin: eureka_p1416): boolean {
    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    switch (pin) {
      case eureka_p1416.Aﾎﾟｰﾄ:
        if (pins.digitalReadPin(DigitalPin.P14) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_p1416.Bﾎﾟｰﾄ:
        if (pins.digitalReadPin(DigitalPin.P16) == 1) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }

  //% color="#009A00"  weight=24 blockId=eureka_denkihuman block="人感ｾﾝｻ |%pin|" group="2_電気の利用ユニット"
  export function eureka_denkihuman(pin: eureka_denki): number {
    switch (pin) {
      case eureka_denki.Aﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P14);
      case eureka_denki.Bﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P16);
    }
  }

  //% color="#009A00"  weight=23 blockId=eureka_denkiwhite block="LED |%mode| |%pin|" group="2_電気の利用ユニット"
  export function eureka_denkiwhite(mode: onoff, port: eureka_denki) {
    switch (port) {
      case eureka_denki.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P13, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P13, 0);
        }
      case eureka_denki.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
  }

  //% color="#ff3d03" weight=25 blockId=eureka_buz_set block="ﾕｰﾚｶIOで音をならす" group="3_ユーレカ装置"
  export function eureka_buz_set() {
    pins.analogSetPitchPin(AnalogPin.P8);
  }

  //% color="#6041f1"  weight=23 blockId=eureka_L9110 block="ﾓｰﾀｰL |%mode| |%pin|" group="3_ユーレカ装置"
  //% mode.min=-100 mode.max=100
  export function L9110driver(port: eureka_denki, mode: number) {
    switch (port) {
      case eureka_denki.Aﾎﾟｰﾄ:
        if (mode > 0) {
          pins.analogWritePin(AnalogPin.P0, Math.round(mode * 10.23));
          pins.digitalWritePin(DigitalPin.P13, 0);
        }
        if (mode < 0) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.analogWritePin(AnalogPin.P13, Math.round(-mode * 10.23));
        }
        if (mode == 0) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
        }
        break;
      case eureka_denki.Bﾎﾟｰﾄ:
        if (mode > 0) {
          pins.analogWritePin(AnalogPin.P1, Math.round(mode * 10.23));
          pins.digitalWritePin(DigitalPin.P15, 0);
        }
        if (mode < 0) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.analogWritePin(AnalogPin.P15, Math.round(-mode * 10.23));
        }
        if (mode == 0) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
        }
        break;
    }
  }

  //% color="#525252" weight=18 blockId=eureka_relay block="単体_ﾘﾚｰ(ﾃﾞｼﾞﾀﾙ) |%mode| |%pin|" group="3_ユーレカ装置"
  export function eureka_relay(mode: onoff, pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_IO.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
      case eureka_IO.Cﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P2, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P2, 0);
        }
    }
  }
  //% color="#525252" weight=19 blockId=eureka_relay_2 block="FETﾘﾚｰ(ｱﾅﾛｸﾞ出力) |%limit| |%syuturyoku|" group="3_ユーレカ装置"
  //% syuturyoku.min=0 syuturyoku.max=1023
  export function eureka_relay_2(syuturyoku: number, pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ: {
        return pins.analogWritePin(AnalogPin.P0, syuturyoku);
      }
      case eureka_IO.Bﾎﾟｰﾄ: {
        return pins.analogWritePin(AnalogPin.P1, syuturyoku);
      }
      case eureka_IO.Cﾎﾟｰﾄ: {
        return pins.analogWritePin(AnalogPin.P2, syuturyoku);
      }
    }
  }

  //% color="#40a6ff" weight=17 blockId=eureka_white block="単体_LED |%mode| |%pin|" group="3_ユーレカ装置"
  export function eureka_white(port: eureka_IO, mode: onoff) {
    switch (port) {
      case eureka_IO.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_IO.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
      case eureka_IO.Cﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P2, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P2, 0);
        }
    }
  }
  //% color="#858585" weight=24 blockId=eureka_m_driver block="ﾓｰﾀｰﾄﾞﾗｲﾊﾞｰ 動き|%mode| |%pin|" group="3_ユーレカ装置"
  export function eureka_m_driver(mode: moter_d, pin: eureka_denki) {
    switch (pin) {
      case eureka_denki.Aﾎﾟｰﾄ:
        if (mode == moter_d.ﾏｴ) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.ｳｼﾛ) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.ﾏｴ_ﾋﾀﾞﾘ) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.ﾏｴ_ﾐｷﾞ) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.ｳｼﾛ_ﾋﾀﾞﾘ) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.ｳｼﾛ_ﾐｷﾞ) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.ﾃｲｼ) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
      case eureka_denki.Bﾎﾟｰﾄ:
        if (mode == moter_d.ﾏｴ) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.ｳｼﾛ) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.ﾏｴ_ﾋﾀﾞﾘ) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.ﾏｴ_ﾐｷﾞ) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.ｳｼﾛ_ﾋﾀﾞﾘ) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.ｳｼﾛ_ﾐｷﾞ) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.ﾃｲｼ) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
    }
  }

  //% color="#d4b41f"  weight=7 blockId=eureka_light block="単体_光ｾﾝｻ |%pin|" group="4_センサの値"
  export function tantai_light(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
      case eureka_IO.Bﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
      case eureka_IO.Cﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P2) / 1023) * 100);
    }
  }

  //% color="#d4b41f"  weight=6 block="単体_光ｾﾝｻ |%limit| より暗い |%pin|" group="4_センサの値"
  //% limit.min=0 limit.max=100
  export function tantai_Light(limit: number, pin: eureka_IO): boolean {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Bﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Cﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }

  //% color="#858585" weight=8 block="単体_人が動いたら |%pin|" group="4_センサの値"
  export function tantai_humanDetection(pin: eureka_IO): boolean {
    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Bﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Cﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }
  //% color="#858585" weight=9 blockId=eureka_human block="単体_人感ｾﾝｻ |%pin|" group="4_センサの値"
  export function eureka_human(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P0);
      case eureka_IO.Bﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P1);
      case eureka_IO.Cﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P2);
    }
  }
  //% color="#ff7b00" weight=10 blockId=eureka_temp block="温度ｾﾝｻMCP |%pin|" group="4_センサの値"
  export function eureka_temp(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P0) * 3250) / 1024 - 500) / 10
        );
      case eureka_IO.Bﾎﾟｰﾄ:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P1) * 3250) / 1024 - 500) / 10
        );
      case eureka_IO.Cﾎﾟｰﾄ:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P2) * 3250) / 1024 - 500) / 10
        );
    }
  }

  //% color="#2a2aba" weight=15 blockId=sonar_ping block="超音波距離ｾﾝｻ　|%pin|" group="4_センサの値"
  export function ping(pin: eureka_tlp): number {
    switch (pin) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P13, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P13, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P13, 0);
        // read
        const d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
        return Math.idiv(d1, 58);
      case eureka_tlp.Bﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);
        // read
        const d2 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
        return Math.idiv(d2, 58);
    }
  }

  //% color="#f071bd" weight=5 blockId=eureka_CdS block="単体_ﾌｫﾄﾘﾌﾚｸﾀｰ |%pin|" group="4_センサの値"
  export function eureka_CdS(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        return (pins.analogReadPin(AnalogPin.P0) / 1023) * 100;
      case eureka_IO.Bﾎﾟｰﾄ:
        return (pins.analogReadPin(AnalogPin.P1) / 1023) * 100;
      case eureka_IO.Cﾎﾟｰﾄ:
        return (pins.analogReadPin(AnalogPin.P2) / 1023) * 100;
    }
  }

  //% shim=DS18B20::Temperature
  //% group="4_センサの値"
  export function Temperature(p: number): number {
    // Fake function for simulator
    return 0;
  }

  /*
    //% color="#ff7b00" weight=7 blockId="Temperature_string" 
    //% block="温度センサDS（文字返し） |%p|"
    //% p.fieldEditor="gridpicker" p.fieldOptions.columns=4
    //% group="4_センサの値"
    export function TemperatureString(p: eureka_IO): string {
        let temp = Temperature(p);
        let x = Math.round((temp / 100))
        let y = Math.round((temp % 100))
        let z = ''
        if (temp >= 0) {
            z = x.toString()
        }
        else if (temp < 0) {
            z = '-' + (-x).toString()
        }
        return z
    }
    */

  //% weight=10 blockId="Temperature_number"
  //% block="温度ｾﾝｻDS |%p|"
  //% p.fieldEditor="gridpicker" p.fieldOptions.columns=4
  //% group="4_センサの値"
  export function TemperatureNumber(p: eureka_IO): number {
    let temp = Temperature(p);
    let x = Math.round(temp / 100);
    return x;
  }
}

//% color="#3943c6" block="ユーレカ自動車" icon="\uf1b9"

 

  namespace eureka_blocks_car {
  //% color="#f071bd" weight=18 blockId=auto_photo_R block="右ﾌｫﾄﾘﾌﾚｸﾀｰ" group="1　センサー"
  export function phto_R() {
    return Math.round((pins.analogReadPin(AnalogPin.P2) / 1023) * 100);
  }

  //% color="#f071bd" weight=18 blockId=auto_photo_L block="左ﾌｫﾄﾘﾌﾚｸﾀｰ" group="1　センサー"
  export function phto_L() {
    return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
  }

//% color="#d4b41f"  weight=17 block="右ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit| より小さい" group="1　センサー"
  //% limit.min=0 limit.max=100
  export function photo_R(limit: number): boolean {
      if ((pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
  }

//% color="#d4b41f"  weight=17 block="左ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit| より小さい" group="1　センサー"
  //% limit.min=0 limit.max=100
  export function photo_L(limit: number): boolean {
      if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
  }

  //% weight=20 blockId=sonar_ping_2 block="きょりｾﾝｻ" group="1　センサー"
  export function ping() {
    // send
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    pins.digitalWritePin(DigitalPin.P8, 0);
    control.waitMicros(2);
    pins.digitalWritePin(DigitalPin.P8, 1);
    control.waitMicros(10);
    pins.digitalWritePin(DigitalPin.P8, 0);
    // read
    const d = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
    return Math.idiv(d, 58);
  }

  //% weight=19 block="きょりが |%limit| cmより小さく" group="1　センサー"
  //% limit.min=0 limit.max=50
  export function sonar_ping_3(limit: number): boolean {
    // send
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    pins.digitalWritePin(DigitalPin.P8, 0);
    control.waitMicros(2);
    pins.digitalWritePin(DigitalPin.P8, 1);
    control.waitMicros(10);
    pins.digitalWritePin(DigitalPin.P8, 0);
    // read
    const d = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
    if (Math.idiv(d, 58) < limit) {
      return true;
    } else {
      return false;
    }
  }

  //% color="#40a6ff" weight=17 blockId=auto_white_LED block="前照灯 |%mode| " group="2　ライト"
  export function white_LED(mode: onoff) {
    if (mode == onoff.ON) {
      led.enable(false);
      pins.digitalWritePin(DigitalPin.P3, 1);
    } else {
      led.enable(false);
      return pins.digitalWritePin(DigitalPin.P3, 0);
    }
  }

  //% color="#40a6ff" weight=17 blockId=auto_red_LED block="ﾌﾞﾚｰｷﾗﾝﾌﾟ |%mode| " group="2　ライト"
  export function red_LED(mode: onoff) {
    if (mode == onoff.ON) {
      led.enable(false);
      pins.digitalWritePin(DigitalPin.P15, 1);
    } else {
      led.enable(true);
      return pins.digitalWritePin(DigitalPin.P15, 0);
    }
  }

  //% color="#3943c6" weight=10　blockId=servos_condition
  //% block="左右バランス調整 左へ |%le| 右へ" group="基本の動き"
  //% le.min=-20 le.max=20
  export function condition(le: number): void {
  con_le=le;
    }

  //% color="#3943c6" weight=10　blockId=servos_op
  //% block="出力調整 |%op|" group="基本の動き"
  //% op.min=-100 op.max=0  
  export function servo_op(op: number): void {
  con_op=op;
    }

    //% color="#3943c6" weight=10　blockId=servos_forward
  //% block="前 " group="基本の動き"
  export function forward(): void {
    pins.servoWritePin(AnalogPin.P14, 90-90*(con_op+100)/100 +20 + con_le);
    pins.servoWritePin(AnalogPin.P13, 90+90*(con_op+100)/100 -20 + con_le);
  }

  //% color="#3943c6" weight=9 blockId=servos_backward
  //% block="後ろ" group="基本の動き"
  export function backward(): void {
    pins.servoWritePin(AnalogPin.P14, 90+90*(con_op+100)/100 -20 + con_le);
    pins.servoWritePin(AnalogPin.P13, 90-90*(con_op+100)/100 +20 + con_le);
  }

  //% color="#3943c6" weight=8 blockId=servos_left
  //% block="左" group="基本の動き"
  export function left(): void {
    pins.servoWritePin(AnalogPin.P13, 90-90*(con_op+100)/100  +20 + con_le);
    pins.servoWritePin(AnalogPin.P14, 90-90*(con_op+100)/100  +20 + con_le);
  }


  //% color="#3943c6" weight=7 blockId=servos_right
  //% block="右" group="基本の動き"
  export function right(): void {
    pins.servoWritePin(AnalogPin.P13, 90+90*(con_op+100)/100 -20 + con_le);
    pins.servoWritePin(AnalogPin.P14, 90+90*(con_op+100)/100 -20 + con_le);
  }

  //% color="#3943c6" weight=6 blockId=servos_stop
  //% block="止まる" group="基本の動き"
  export function stop(): void {
    pins.servoWritePin(AnalogPin.P13, 90);
    pins.servoWritePin(AnalogPin.P14, 90);
  }

  //% color="#3943c6" weight=10　blockId=servo_pro_lr
  //% block="左右プログラム 左へ |%set_lr| 右へ" group="基本の動き"
  //% set_lr.min=-30 set_lr.max=30
  export function pro_lr(set_lr : number): void {
    pins.servoWritePin(AnalogPin.P14, 90-60*(con_op+100)/100+set_lr + con_le);
    pins.servoWritePin(AnalogPin.P13, 90+60*(con_op+100)/100+set_lr + con_le);
  }

  //% color="#3943c6" weight=10　blockId=servo_pro_l
  //% block="左車輪 出力 |%set_l| " group="基本の動き"
  //% set_l.min=-100 set_l.max=100
  export function pro_l(set_l : number): void {
    pins.servoWritePin(AnalogPin.P13, 90-90*set_l/100);
  }

  //% color="#3943c6" weight=10　blockId=servo_pro_r
  //% block="右車輪 出力 |%set_r| " group="基本の動き"
  //% set_r.min=-100 set_r.max=100
  export function pro_r(set_r : number): void {
    pins.servoWritePin(AnalogPin.P14, 90+90*set_r/100);
  }

  //% color="#3943c6" weight=5 blockId=servos_neutral
  //% block="サーボをニュートラルにします" group="基本の動き"
  export function neutral(): void {
    pins.digitalWritePin(DigitalPin.P13, 0);
    pins.digitalWritePin(DigitalPin.P14, 0);
  }
}
