import { Engine3D } from "esael";
import React, { useEffect, useRef, useState, useLayoutEffect, useReducer } from "react"
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";
import reactDom from "react-dom"



function TimeLineLine() {
  for (var i = 0; i < 16; i++) {

  }
}


function TimelineEvent({ image, year, color }) {

  const [ShowDetail, setShowDetail] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const svg = useRef()


  function pointerInside() {
    const [x, y] = [Engine3D.canvas.offsetWidth / 2, Engine3D.canvas.offsetHeight / 2]
    const box = svg.current.getBoundingClientRect();
    return x > box.left && x < box.right && y > box.top && y < box.bottom;
  }
  const requestRef = React.useRef()

  const animate = time => {
    setHighlight(pointerInside())
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [])


  Engine3D.canvas.addEventListener('mousedown', () => {
    if (pointerInside()) {
      console.log('show', year);

    }
  })

  return (
    <>
      <svg ref={svg}
        width="16" height="32"
        fill={highlight ? 'white' : color} viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <image href={image} height="13" width="13" x='52.5%' y='52%' transform="translate(-7,-9)" />
        <text x="20" y="90" fill="white" transform="scale(0.2)">{year}</text>
      </svg>
    </>
  )
}



export const Timeline = ({ items }) => {
  const totalItems = items.length;
  const numberOfActiveItems = items.filter(item => item.active).length;
  const progressBarWidth = totalItems > 1 ? (numberOfActiveItems - 1) / (totalItems - 1) * 100 : 0;

  return (
    <div className="timeline">
      <div className="timeline-progress" style={{ width: `${progressBarWidth}%` }}></div>
      <div className="timeline-items">
        {items.map((item, i) => (
          <div key={i} className={"timeline-item" + (item.active ? ' active' : '')}>
            <div className="timeline-content">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const items = [
  {
    name: 'Step 1',
    active: true,
  },
  {
    name: 'Step 2',
    active: true,
  },
  {
    name: 'Step 3',
    active: true,
  },
  {
    name: 'Step 4',
    active: false,
  }
]

const data = [
  {
    year: 1906,
    img: 'data/timeline/img/Toàn cảnh ngôi trường Viện Đại học Đông Dương.jpg',
    description: `Ngày 16/05/1906, theo nghị định số 1514A, thành lập Viện Đại học Đông Dương tại 19 Lê Thánh Tông, Hoàn Kiếm, Hà Nội. Đại học Đông Dương thành lập trên cơ sở một số cơ sở giáo dục đã có sẵn và có mở rộng nhằm “đào tạo nhân viên bản xứ cho các bộ máy hành chính địa phương hoặc các cơ quan chuyên môn thuộc Phủ Toàn quyền Đông Dương`,
    audio: 'data/timeline/audio/HMI 1 Viet.mp3'
  },
  {
    year: 1945,
    img: 'data/timeline/img/Đại học Quốc gia Việt Nam.png',
    description: `Trường Đại học Quốc gia Việt Nam: trường đại học công lập, thành lập ở Hà Nội vào cuối năm 1945, sau Cách mạng tháng Tám, dưới chính thể Việt Nam Dân chủ Cộng hòa, trên cơ sở tiếp quản Viện Đại học Đông Dương.`,
    audio: 'data/timeline/audio/HMI 2 Viet.mp3'
  },
  {
    year: 1951,
    img: 'data/timeline/img/Lễ khai giảng Đại học Quốc gia Việt Nam ngày 15-11-1945 2.jpg',
    description: `Nhà nước ta thành lập Trường Khoa học Cơ bản (tại Chiến khu Việt Bắc). Đây là một trong những Trường tiền thân của Trường Đại học Tổng hợp Hà Nội sau này.`,
    audio: 'data/timeline/audio/HMI 3 Viet.mp3'
  },
  {
    year: 1956,
    img: 'data/timeline/img/Đại học Tổng hợp.jpg',
    description: `Trường Đại học Tổng hợp Hà Nội và Trường Đại học Sư phạm Hà Nội được thành lập.
    Trường Đại học Tổng Hợp Hà Nội được thành lập kế thừa truyền thống và cơ sở vật chất từ 3 trường đại học: Trường Đại học Đông Dương ( 1906), Đại học Quốc gia Việt Nam (1945) và Trường Khoa học Cơ bản (1951)`,
    audio: 'data/timeline/audio/HMI 4 Viet.mp3'
  },
  {
    year: 1967,
    img: 'data/timeline/img/Đại học Sư phạm Ngoại ngữ.jpg',
    description: `Tiền thân của Trường Đại học Sư phạm Ngoại ngữ được thành lập năm 1955 với tên “Trường Ngoại ngữ”. Năm 1958, trường được sáp nhập vào Trường Đại học Sư phạm Hà Nội và trở thành Khoa Ngoại ngữ.
    Ngày 14/8/1967, Trường Đại học Sư phạm Ngoại ngữ Hà Nội được thành lập trên cơ sở Khoa Ngoại ngữ của Trường Đại học Sư phạm Hà Nội.`,
    audio: 'data/timeline/audio/HMI 5 Viet.mp3'
  },
  {
    year: 1993,
    img: 'data/timeline/img/Nhà điều hành ĐHQGHN.jpg',
    description: `Ngày 14/01/1993, Hội nghị lần thứ tư Ban chấp hành Trung ương Đảng Cộng sản Việt Nam (Khóa VII) đã ra Nghị quyết, trong đó chỉ rõ nhiệm vụ “xây dựng một số trường đại học trọng điểm quốc gia” để làm đầu tàu và nòng cột cho giáo dục đại học nước nhà.`,
    audio: 'data/timeline/audio/HMI 6 Viet.mp3'
  },
  {
    year: 1998,
    img: 'data/timeline/img/phuong-tuyen-sinh-dai-hoc-quoc-gia-ha-noi-tai-chuc-dai-hoc-ngoai-ngu-1-620x360-15857495705031679508115.jpg',
    description: `Năm 1998, Chính phủ ban hành Nghị định về việc xóa bỏ Trường Đại học Đại cương.`,
    audio: 'data/timeline/audio/HMI 7 Viet.mp3'
  }
]

data.forEach(item => item.id = data.indexOf(item))


var HistoryAudio = null;
export function HistoryTimeline() {
  const [item, setItem] = useState(0);


  return (
    <>
      <div className='d-flex flex-row justify-content-between'
        style={{ width: '500px' }}
      >
        {data.map(item => <TimelineNode key={item.id} data={item}
          onClick={id => {
            setItem(id)
            if (HistoryAudio != null) {
              console.log(HistoryAudio);
              HistoryAudio.pause();
              HistoryAudio.currentTime = 0;
            }
            HistoryAudio = new Audio(data[id].audio);
            HistoryAudio.play();
          }}
        />)}
      </div>
      <div className='d-flex flex-row mt-1'>
        <img width='200px' height='180px' src={data[item].img} className='mr-1' />
        <p style={{ width: '422px', height: '80px', color: 'white' }}>{data[item].description}</p>
      </div>
    </>
  )
}

function TimelineNode({ data, onClick }) {
  const { id, img, year } = data;
  const ref = useRef();
  const requestRef = React.useRef()


  const [hl, setHl] = useState(false);

  function pointerInside() {
    const [x, y] = [Engine3D.canvas.offsetWidth / 2, Engine3D.canvas.offsetHeight / 2]
    const box = ref.current.getBoundingClientRect();
    return x > box.left && x < box.right && y > box.top && y < box.bottom;
  }

  const animate = time => {
    setHl(pointerInside())
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    Engine3D.canvas.addEventListener('click', () => {
      console.log('down');
      if (pointerInside()) {
        onClick(id)
      }
    })
    return () => cancelAnimationFrame(requestRef.current);
  }, [])





  return (
    <div key={id} className='d-flex flex-column' style={{ backgroundColor: hl ? 'white' : 'red' }} ref={ref}>
      <img src={img} width='45px' height='25px' />
      <p style={{
        fontSize: '8px',
        color: hl ? 'black' : 'white',
        margin: 0,
        textAlign: 'center'
      }}>
        {year}
      </p>
    </div>
  )
}