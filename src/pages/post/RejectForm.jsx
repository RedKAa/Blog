import ProForm, { ProFormText,ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';

const RejectForm = ({readonly = false, update = false,}) => {
  return (
    <>
      <ProForm.Group>
      <ProFormTextArea
            rules={[
              {
                min: 2,
                max: 10000,
                required: true,
                message: 'Reason must more than 2 characters length!',
              },
            ]}
            label="Reason"
            name="rejectReason"
            width="md"
            readonly={readonly}
            placeholder="Input reason..."
        />
        {/* <ProFormText
            rules={[
              {
                min: 2,
                max: 100,
                required: true,
                message: 'Tên từ 2 đến 100 kí tự',
              },
            ]}
            label="Người kiểm duyệt"
            name="Người kiểm duyệt"
            width="md"
            readonly={readonly}
        />        */}
      </ProForm.Group>
    </>
  );
};

export default RejectForm;
