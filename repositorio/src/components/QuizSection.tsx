import React, { useState, useEffect } from 'react';
import {
  Card,
  Radio,
  Button,
  Space,
  Alert,
  Tag,
  Progress,
  Typography
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export interface QuizQuestion {
  pergunta: string;
  alternativas: string[];
  correta: number;
  explicacao?: string;
}

interface QuizSectionProps {
  titulo: string;
  perguntas: QuizQuestion[];
  storageKey: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  titulo,
  perguntas,
  storageKey
}) => {
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [submetido, setSubmetido] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setRespostas(data.respostas || {});
        setSubmetido(data.submetido || false);
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ respostas, submetido })
    );
  }, [respostas, submetido, storageKey]);

  const handleResposta = (index: number, valor: number) => {
    setRespostas(prev => ({ ...prev, [index]: valor }));
  };

  const handleSubmit = () => {
    setSubmetido(true);
  };

  const handleReset = () => {
    setRespostas({});
    setSubmetido(false);
    localStorage.removeItem(storageKey);
  };

  const totalRespondidas = Object.keys(respostas).length;
  const acertos = perguntas.reduce((acc, q, i) => {
    return acc + (respostas[i] === q.correta ? 1 : 0);
  }, 0);
  const percentual = Math.round((totalRespondidas / perguntas.length) * 100);

  return (
    <Card
      title={titulo}
      style={{ marginTop: '32px' }}
      extra={
        submetido && (
          <Tag color={acertos >= perguntas.length * 0.7 ? 'success' : 'warning'}>
            {acertos}/{perguntas.length} corretas
          </Tag>
        )
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {!submetido && (
          <div>
            <Space align="center" style={{ width: '100%' }}>
              <Text strong>Progresso:</Text>
              <Progress
                percent={percentual}
                style={{ flex: 1 }}
                status={totalRespondidas === perguntas.length ? 'success' : 'active'}
              />
            </Space>
            {totalRespondidas < perguntas.length && (
              <Alert
                type="info"
                showIcon
                message="Responda todas as questões para verificar suas respostas"
                style={{ marginTop: '12px' }}
              />
            )}
          </div>
        )}

        {perguntas.map((q, index) => {
          const respondida = respostas[index] !== undefined;
          const acertou = submetido && respostas[index] === q.correta;
          const errou = submetido && respostas[index] !== q.correta;

          return (
            <Card
              key={index}
              type="inner"
              title={`Questão ${index + 1}`}
              style={{
                borderColor: acertou ? '#b7eb8f' : errou ? '#ffa39e' : undefined
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph>{q.pergunta}</Paragraph>

                <Radio.Group
                  value={respostas[index]}
                  onChange={e => handleResposta(index, e.target.value)}
                  disabled={submetido}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {q.alternativas.map((alt, i) => (
                      <Radio key={i} value={i}>
                        {alt}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>

                {submetido && (
                  <div style={{ marginTop: '12px' }}>
                    {acertou ? (
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Correto!
                      </Tag>
                    ) : (
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Incorreto
                      </Tag>
                    )}
                    {q.explicacao && (
                      <Paragraph style={{ marginTop: '8px', color: '#666' }}>
                        <Text strong>Explicação:</Text> {q.explicacao}
                      </Paragraph>
                    )}
                  </div>
                )}
              </Space>
            </Card>
          );
        })}

        <Space>
          {!submetido ? (
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={totalRespondidas < perguntas.length}
            >
              Verificar Respostas
            </Button>
          ) : (
            <Button type="primary" icon={<ReloadOutlined />} onClick={handleReset}>
              Refazer Teste
            </Button>
          )}
        </Space>

        {submetido && (
          <Alert
            type={acertos >= perguntas.length * 0.7 ? 'success' : 'warning'}
            showIcon
            message={
              acertos >= perguntas.length * 0.7
                ? 'Parabéns! Você domina este conteúdo.'
                : 'Revise o conteúdo e tente novamente.'
            }
          />
        )}
      </Space>
    </Card>
  );
};