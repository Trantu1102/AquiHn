import { AQIDataPoint } from './types';

// Data transcribed from the user's image
export const HANOI_AQI_DATA: AQIDataPoint[] = [
  { date: '4/11', fullDate: '2024-11-04', aqi: 80, status: 'Trung bình' },
  { date: '5/11', fullDate: '2024-11-05', aqi: 152, status: 'Không lành mạnh' },
  { date: '6/11', fullDate: '2024-11-06', aqi: 100, status: 'Trung bình' },
  { date: '7/11', fullDate: '2024-11-07', aqi: 88, status: 'Trung bình' },
  { date: '8/11', fullDate: '2024-11-08', aqi: 88, status: 'Trung bình' },
  { date: '9/11', fullDate: '2024-11-09', aqi: 98, status: 'Trung bình' },
  { date: '10/11', fullDate: '2024-11-10', aqi: 75, status: 'Trung bình' },
  { date: '11/11', fullDate: '2024-11-11', aqi: 69, status: 'Trung bình' },
  { date: '12/11', fullDate: '2024-11-12', aqi: 88, status: 'Trung bình' },
  { date: '13/11', fullDate: '2024-11-13', aqi: 135, status: 'Không tốt cho nhóm nhạy cảm' },
  { date: '14/11', fullDate: '2024-11-14', aqi: 153, status: 'Không lành mạnh' },
  { date: '15/11', fullDate: '2024-11-15', aqi: 157, status: 'Không lành mạnh' },
  { date: '16/11', fullDate: '2024-11-16', aqi: 158, status: 'Không lành mạnh' },
  { date: '17/11', fullDate: '2024-11-17', aqi: 154, status: 'Không lành mạnh' },
  { date: '18/11', fullDate: '2024-11-18', aqi: 54, status: 'Trung bình' },
  { date: '19/11', fullDate: '2024-11-19', aqi: 68, status: 'Trung bình' },
  { date: '20/11', fullDate: '2024-11-20', aqi: 89, status: 'Trung bình' },
  { date: '21/11', fullDate: '2024-11-21', aqi: 130, status: 'Không tốt cho nhóm nhạy cảm' },
  { date: '22/11', fullDate: '2024-11-22', aqi: 155, status: 'Không lành mạnh' },
  { date: '23/11', fullDate: '2024-11-23', aqi: 166, status: 'Không lành mạnh' },
  { date: '24/11', fullDate: '2024-11-24', aqi: 139, status: 'Không tốt cho nhóm nhạy cảm' },
  { date: '25/11', fullDate: '2024-11-25', aqi: 152, status: 'Không lành mạnh' },
  { date: '26/11', fullDate: '2024-11-26', aqi: 152, status: 'Không lành mạnh' },
  { date: '27/11', fullDate: '2024-11-27', aqi: 153, status: 'Không lành mạnh' },
  { date: '28/11', fullDate: '2024-11-28', aqi: 167, status: 'Không lành mạnh' },
  { date: '29/11', fullDate: '2024-11-29', aqi: 183, status: 'Không lành mạnh' },
  { date: '30/11', fullDate: '2024-11-30', aqi: 187, status: 'Không lành mạnh' },
  { date: '1/12', fullDate: '2024-12-01', aqi: 185, status: 'Không lành mạnh' },
  { date: '2/12', fullDate: '2024-12-02', aqi: 171, status: 'Không lành mạnh' },
  { date: '3/12', fullDate: '2024-12-03', aqi: 168, status: 'Không lành mạnh' },
  { date: '4/12', fullDate: '2024-12-04', aqi: 183, status: 'Không lành mạnh' },
  { date: '5/12', fullDate: '2024-12-04', aqi: 174, status: 'Không lành mạnh' },
  { date: '6/12', fullDate: '2024-12-04', aqi: 182, status: 'Không lành mạnh' },
  { date: '7/12', fullDate: '2024-12-04', aqi: 196, status: 'Không lành mạnh' },
  { date: '8/12', fullDate: '2024-12-04', aqi: 177, status: 'Không lành mạnh' },
  { date: '9/12', fullDate: '2024-12-04', aqi: 188, status: 'Không lành mạnh' }
];

export const SYSTEM_INSTRUCTION = `Bạn là một chuyên gia về chất lượng không khí và sức khỏe môi trường tại Việt Nam. 
Bạn sẽ nhận được dữ liệu về chỉ số AQI của Hà Nội.
Hãy đưa ra những lời khuyên ngắn gọn, hữu ích và cảnh báo sức khỏe dựa trên các mức AQI cụ thể.
Giọng điệu: Thân thiện, chuyên nghiệp, quan tâm. Sử dụng Tiếng Việt.
Khi phân tích xu hướng, hãy chỉ ra các ngày ô nhiễm cao điểm.`;
