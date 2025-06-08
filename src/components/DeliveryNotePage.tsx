import React from 'react';
import { Box, Typography, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Divider, Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const DeliveryNotePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Container component={Paper} sx={{ p: 4, my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          納品書
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{ 
              mb: 2,
              '@media print': {
                display: 'none'
              }
            }}
          >
            印刷
          </Button>
          <Typography variant="subtitle1">納品日: 2024年XX月XX日</Typography>
          <Typography variant="h6" sx={{mt: 1}}>株式会社サンプル</Typography>
          <Typography>〒123-4567 東京都渋谷区...</Typography>
          <Typography>TEL: 03-1234-5678</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">納品先:</Typography>
        <Typography>クライアント株式会社 御中</Typography>
      </Box>

      <Typography sx={{mb: 2}}>下記の通り、納品いたしました。</Typography>

      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>品名</TableCell>
            <TableCell align="right">数量</TableCell>
            <TableCell>備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Webサイト制作一式</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell>サーバー設定、デザイン、コーディング含む</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>保守・運用サービス</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell>月次</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <Box sx={{ textAlign: 'right', mt: 8 }}>
          <Typography>上記正に納品いたしました。</Typography>
          <Box sx={{display: 'inline-block', borderBottom: 1, width: 200, mt: 4}}></Box>
      </Box>
    </Container>
  );
};

export default DeliveryNotePage; 