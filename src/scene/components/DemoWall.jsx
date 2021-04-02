import React, { useState } from 'react';
import { createPortal } from "react-dom"

function inline2style(inline) {
  var data = inline.split(';').map(opt => opt.split(':').map(value => value.trim()))
  var style = {}
  for (var s of data) {
    if (s[0])
      style[s[0]] = s[1];
  }
  return style;
}

function Img({ inline, src }) {


  const style = inline2style(inline)
  const [show, setShow] = useState(false);
  return (
    <>
      <img
        onClick={e => {
          e.stopPropagation();
          setShow(true);
          document.exitPointerLock();

        }}
        className='position-absolute'
        width={style.width}
        height={style.height}
        style={style}
        src={`data/demo/${src}`}
      />
      {
        show && createPortal(
          <>
            <button style={{ position: 'fixed' }}
              onClick={() => { setShow(false) }}
            >
              Đóng
            </button>
            <img src={`data/demo/${src}`} />
          </>
          ,
          document.getElementById('ui'))
      }
    </>
  )


}

function Text({ inline, children }) {
  const style = inline2style(inline)
  style.color = 'red'
  return <p className='position-absolute'
    style={style}>

    {children}
  </p >
}

export function DemoWall() {
  return (
    <div className='demo-wall position-relative' style={{ width: '950px', height: '360px' }}>
      <Text inline="left: 40px; top: 10px">Quá trình hình thành và phát triển</Text>
      <Img inline="width: 51px;height: 113px;top: 60px;" src="Văn_Miếu_Quốc_Tử_Giám_panoramio.jpg" />

      <Text inline="left: 65px; top: 30px; transform: rotate(270deg) translate(-111px, -108px);">ĐẠI HỌC ĐÔNG DƯƠNG</Text>
      <Img inline="width: 92px;height: 68px;top: 60px;left: 65px;" src='221753.png' />
      <Img inline="width: 40px;height: 60px;top: 60px;left: 162px;" src='201310.png' />
      <Img inline="width: 40px;height: 60px;top: 60px;left: 206px;" src='084919.png' />
      <Img inline="width: 73px;height: 65px;top: 147px;left: 65px;" src='085031.png' />
      <Img inline="width: 73px;height: 65px;top: 147px;left: 141px;" src='085324.png' />
      <Img inline="width: 73px;height: 65px;top: 147px;left: 218px;" src='085617.png' />
      <Img inline="width: 39px;height: 65px;top: 216px;left: 65px;" src='092646.png' />
      <Img inline="width: 39px;height: 65px;top: 216px;left: 107px;" src='092833.png' />
      <Img inline="width: 73px;height: 65px;top: 216px;left: 149px;" src='092930.png' />

      <Text inline="left: 310px;top: 30px; transform: rotate(270deg) translate(-132px, -127px);">ĐẠI HỌC QUỐC GIA VIỆT NAM</Text>
      <Img inline="width: 107px;height: 65px;top: 60px;left: 310px;" src='101010.png' />
      <Img inline="width: 47px;height: 65px;top: 130px;left: 310px;" src='101330.png' />
      <Img inline="width: 47px;height: 30px;top: 130px;left: 363px;" src='101457.png' />
      <Img inline="width: 79px; height: 52px; top: 200px; left: 310px;" src='101745.png' />
      <Img inline="width: 79px; height: 52px; top: 200px; left: 393px" src='101915.png' />
      <Img inline="width: 79px;height: 52px;top: 60px;left: 480px;" src='115054.png' />
      <Img inline="width: 79px;height: 52px;top: 60px;left: 566px;" src='115137.png' />
      <Img inline="width: 79px;height: 52px;top: 116px;left: 481px;" src='115137.png' />
      <Img inline="width: 79px;height: 52px;top: 116px;left: 566px;" src='115110.png' />
      <Img inline="width: 79px;height: 52px;top: 172px;left: 482px;" src='115137.png' />
      <Img inline="width: 79px;height: 82px;top: 172px;left: 567px;" src='115203.png' />

      <Text inline="left: 684px;top: 21px; transform: rotate(270deg) translate(-132px, -127px);">ĐẠI HỌC QUỐC GIA HÀ NỘI</Text>

      <Img inline="width: 79px;height: 82px;top: 59px;left: 684px;" src='Logo-VNU-1995.png' />
      <Img inline="width: 79px;height: 82px;top: 172px;left: 685px;" src='141218.png' />
      <Img inline="width: 79px;height: 82px;top: 172px;left: 772px;" src='141302.png' />
    </div>
  )
}