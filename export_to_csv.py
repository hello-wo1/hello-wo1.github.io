# ADDED: 导入需要的模块
import csv
import time
import firebase_admin
from firebase_admin import credentials, db

# ADDED: 初始化 Firebase Admin SDK
# 请确保你已将服务帐号密钥 JSON 文件放入项目的 'credentials' 文件夹中
# 修改下行路径和 databaseURL 为你实际的值
cred = credentials.Certificate('credentials/project-5399799771103896588-firebase-adminsdk-fbsvc-85f66ba29d.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://project-5399799771103896588-default-rtdb.firebaseio.com'
})

# ADDED: 从 Realtime Database 中读取数据的函数
def read_sensor_data():
    """
    从 Firebase Realtime Database 的 'sensor_readings' 节点读取数据，
    数据格式为字典，每个键对应一条记录。
    """
    ref = db.reference('sensor_readings')
    data = ref.get()
    return data

# ADDED: 将读取到的数据写入 CSV 文件的函数
def export_data_to_csv(data):
    """
    将传感器数据（字典格式）写入 CSV 文件。
    假设每条记录包含 'voltage', 'current' 和 'timestamp' 三个字段。
    """
    csv_filename = 'sensor_readings.csv'
    with open(csv_filename, mode='w', newline='', encoding='utf-8') as csv_file:
        fieldnames = ['voltage', 'current', 'timestamp']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        
        writer.writeheader()  # 写入表头
        # 遍历数据字典，写入每条记录
        if data:
            for key, record in data.items():
                writer.writerow({
                    'voltage': record.get('voltage', ''),
                    'current': record.get('current', ''),
                    'timestamp': record.get('timestamp', '')
                })
        else:
            print("没有读取到数据！")
    print(f"数据已成功导出到 {csv_filename}")

# ADDED: 主函数流程
def main():
    # 读取数据
    sensor_data = read_sensor_data()
    # 将数据写入 CSV 文件
    export_data_to_csv(sensor_data)

if __name__ == '__main__':
    main()
