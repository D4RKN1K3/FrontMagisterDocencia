import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ExportPDF = ({ rubricHasQuestion, academicName }) => {
  console.log(rubricHasQuestion)
  if (!Array.isArray(rubricHasQuestion) || !rubricHasQuestion) {
    return null;
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    headerRow: {
      flexDirection: 'row',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    headerCell: {
      fontWeight: 'bold',
    },
    cell: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    questionCell: {
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cellText: {
      textAlign: 'center',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Nombre de la Rubrica: {rubricHasQuestion[0].rubricName}</Text>
          <Text>Description: {rubricHasQuestion[0].description}</Text>
          <Text>Comentario: {rubricHasQuestion[0].comment}</Text>
          <Text>Estado de la Rubrica: {rubricHasQuestion[0].statusName}</Text>
          {(academicName) &&
            <Text>Nombre Completo del Academico: {academicName}</Text>
          }
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.questionCell, styles.cellText]}>Pregunta</Text>
            <Text style={[styles.headerCell, styles.cell, styles.cellText]}>Excelente</Text>
            <Text style={[styles.headerCell, styles.cell, styles.cellText]}>Bueno</Text>
            <Text style={[styles.headerCell, styles.cell, styles.cellText]}>Medio</Text>
            <Text style={[styles.headerCell, styles.cell, styles.cellText]}>Malo</Text>
          </View>
          {rubricHasQuestion.map((question) => (
            <View key={question.question} style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.questionCell, styles.cellText]}>{question.question}</Text>
              <Text style={[styles.headerCell, styles.cell, styles.cellText]}>{question.excellent}</Text>
              <Text style={[styles.headerCell, styles.cell, styles.cellText]}>{question.good}</Text>
              <Text style={[styles.headerCell, styles.cell, styles.cellText]}>{question.medium}</Text>
              <Text style={[styles.headerCell, styles.cell, styles.cellText]}>{question.bad}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ExportPDF; 