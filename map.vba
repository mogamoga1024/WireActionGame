
Sub ColorToObjectId()

    Dim ws As Worksheet
    Set ws = ActiveSheet
    
    Dim blockColor As Long
    Dim trampolineColor As Long
    Dim deathColor As Long
    blockColor = ws.Range("B2").Interior.Color
    trampolineColor = ws.Range("B3").Interior.Color
    deathColor = ws.Range("B4").Interior.Color
    
    Debug.Print blockColor
    

End Sub
